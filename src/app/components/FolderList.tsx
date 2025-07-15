"use client"
import Link from 'next/link'
import { Accordion, AccordionItem, Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'
import Code from './Code'
import axios from 'axios'
import { SiGeeksforgeeks, SiLeetcode } from 'react-icons/si'

export type GithubItem = {
  name: string
  path: string
  type: "file" | "dir"
  download_url: string | null
}

const baseURL = process.env.NEXT_PUBLIC_GITHUB_BASE_URL

export function FolderList({ path }: { path: string }) {
  const [nodes, setNodes] = useState<GithubItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const fetchNodes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseURL}/${path}`, {
        headers : {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
        }
      });
      setNodes(response.data)
    } catch (error) {
      console.log("error fetching directories :: ", error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchNodes();
  }, [path])
  return (

    loading ? (<div className='flex justify-center'>
      <Spinner classNames={{ label: "text-foreground mt-4" }} variant="gradient" />
    </div>) : (
      <Accordion isCompact selectionMode='multiple' className='text-xs px-0 py-1'>
        {nodes.filter((node) => node.name !== ".gitignore" && node.name !== "metadata.json").map((node) => {
          return (
            <AccordionItem key={node.path} title={<p className='text-xs md:text-base truncate max-w-[200px] sm:max-w-[300px]'>{node.name}</p>} 
            textValue={node.name}
            className='font-mono' startContent={node.path.toLowerCase().includes("/leetcode") ? <SiLeetcode /> : node.path.toLowerCase().includes("/gfg") ? <SiGeeksforgeeks /> : ""}>
              {node.type === "dir" ? (
                <FolderList path={node.path} />
              ) : (
                node.download_url && <Code url={node.download_url} lang={node.name.endsWith('.cpp') ? 'cpp' : 'java'} />
              )}
            </AccordionItem>
          )
        })}
      </Accordion>)

  )
}
