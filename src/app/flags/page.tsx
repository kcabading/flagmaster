'use client'

import countries from '@/data/countries.json'
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/data/authOptions'
import Image from 'next/image'
import { useSearchParams, usePathname } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


interface IPageProps {
    params: { id: string }
}

const continents = ['all','Asia','Africa','Europe','North America','South America','Oceania']

const Flags =  (props: IPageProps) => {

    // const session = await getServerSession(authOptions);
    // console.log('SESSION', session)
    const searchParams = useSearchParams()

    const filterByContinent = searchParams.has('continent') ? searchParams.get('continent') : continents[0]
    const [selectedContinent, setSelectedContinent] = useState(filterByContinent)

    let filteredCountries = countries.filter( country => {
        return selectedContinent === 'all' ? true  :  country.continent === selectedContinent
    })

    return (
        <>
            <div className='lg:w-3/4 max-lg:px-4 w-full'>
                <div className='flex justify-between mb-5'>
                    <h1 className='font-bold mb-2 text-2xl'>List of Flags</h1>
                    <div>
                        <Select onValueChange={setSelectedContinent} defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>By Continent</SelectLabel>
                                    {
                                        continents.map( (continent) => {
                                            return <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                                        })
                                    }
                                    
                                    {/* <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem> */}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        filteredCountries.map((country, index) => {
                            return (
                                <div key={index}>
                                    <p className='text-md'>{country.name}</p>
                                    <div className=''>
                                        <Image src={country.file_url} width={300} height={300} alt={country.name} className='border-2 hover:drop-shadow-lg m-auto max-sm:w-full border-slate-500' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Flags