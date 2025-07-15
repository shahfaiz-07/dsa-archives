"use client"
import { Link } from '@heroui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Code = ({url, lang}: {url: string, lang: string}) => {
  const [code, setCode] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const fetchCode = async() => {
    try {
      const response = await axios.get(url);
      setCode(response.data)
      setLink((response.data as string).split("\n")[0].substring(2).trim());
    } catch (error) {
      console.log("Error fetching file :: ", error);
    }
  }
  useEffect(() => {
    fetchCode()
  }, [url])
  return (
    <div className='flex flex-col gap-2'>
      <Link href={link} isExternal showAnchorIcon className='text-sm md:text-base'>Visit Link</Link>
      <SyntaxHighlighter language={lang} style={a11yDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;