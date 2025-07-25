"use client"
import { Accordion, AccordionItem, Button, Chip, Input, Spinner } from '@heroui/react';
import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useDebounceCallback } from 'usehooks-ts';
import { FolderList, GithubItem } from '../components/FolderList';
import { SiGeeksforgeeks, SiLeetcode } from 'react-icons/si';
import { CiSearch } from 'react-icons/ci';

type Metadata = {
    url: string;
    path: string;
}

const metadataURL = process.env.NEXT_PUBLIC_GITHUB_METADATA_URL;

const Page = () => {
    const [metadata, setMetadata] = useState<Metadata[]>([]);
    const [searchString, setSearchString] = useState<string>("");
    const [searchItems, setSearchItems] = useState<GithubItem[]>([]);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    const debounced = useDebounceCallback(setSearchString, 1000);

    const fetchMetadata = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/metadata");
            setMetadata(response.data);
        } catch (error) {
            console.log("Error fetching metadata :: ", error);
        } finally {
            setLoading(false)
        }
    }

    const search = () => {
        if (searchString.length <= 2) {
            setIsInvalid(true)
            return;
        }
        setIsInvalid(false)
        const query = searchString.toLowerCase().replace(" ", "-");
        const items: GithubItem[] = metadata.filter((data) => data.url.includes(query) || data.url === searchString).map((item) => {
            const value: GithubItem = {
                path: item.path,
                download_url: null,
                name: item.path.split("/").pop() as string,
                type: "dir"
            }
            return value
        });
        setSearchItems(items)
    }

    useEffect(() => {
        search()
    }, [searchString])

    useEffect(() => {
        fetchMetadata();
    }, [])
    return (
        <main className='font-mono p-3 md:p-6'>
            {
                loading ? <div className='min-h-screen grid place-content-center'><Spinner color='primary' variant='gradient' /></div> : (<div className='min-h-screen flex flex-col justify-center items-center gap-x-2'>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 flex gap-3 items-center"><CiSearch /> Search DSA Solutions</h1>
                    <p className="text-center text-sm md:text-base text-muted-foreground mb-6">
                        Enter a problem title, keyword, or URL from LeetCode, GFG, etc. to find my saved solutions.
                    </p>
                    <Input startContent={<FaSearch />} size='lg' placeholder='Type to search...' type='search' className='font-mono max-w-lg' color='primary' variant='underlined'
                        onChange={(e) => {
                            setIsDirty(true)
                            return debounced(e.target.value)
                        }}
                        isInvalid={isDirty && isInvalid}
                        errorMessage={"Type atleast 3 characters..."}
                    />
                    {
                        isDirty && !isInvalid && 
                        (
                            <div className='mt-2 w-full'>
                                <h1 className='text-xl font-bold font-mono'>Found {searchItems.length} Results:</h1>
                                <Accordion selectionMode='multiple' isCompact className=' font-mono px-0'>
                                    {
                                        searchItems.map((item) =>
                                            <AccordionItem key={item.path} title={
                                                <div className='flex flex-wrap justify-between items-center'>
                                                    <p className='text-xs md:text-base truncate max-w-[200px] sm:max-w-[300px]'>{item.name}</p>
                                                    <Chip className='text-xs justify-self-end' size='sm' color={item.path.toLowerCase().includes("/easy") ? "success" : item.path.toLowerCase().includes("/medium") ? "warning" : "danger"}>{item.path.toLowerCase().includes("/easy") ? "Easy" : item.path.toLowerCase().includes("/medium") ? "Medium" : "Hard"}</Chip>
                                                </div>
                                            } startContent={item.path.toLowerCase().includes("/leetcode") ? <SiLeetcode /> : item.path.toLowerCase().includes("/gfg") ? <SiGeeksforgeeks /> : ""}
                                            textValue={item.name}
                                            >
                                                {/* <div className='border px-2 border-gray-600 rounded-lg'> */}
                                                    <FolderList path={item.path} />
                                                {/* </div> */}
                                            </AccordionItem>
                                        )
                                    }
                                </Accordion>
                            </div>
                        )
                    }
                </div>)
            }
        </main>
    )
}

export default Page