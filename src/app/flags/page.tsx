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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


interface IPageProps {
    params: { id: string }
}

const continents = ['all','Asia','Africa','Europe','North America','South America','Oceania']

const Flags =  (props: IPageProps) => {

    const searchParams = useSearchParams()

    const filterByContinent = searchParams.has('continent') ? searchParams.get('continent') : continents[0]
    const [selectedContinent, setSelectedContinent] = useState(filterByContinent)
    const [open, setOpen] = useState(true);

    const initFlagDetails = {
        name: 'test',
        file_url: '',
        alpha3: '',
        continent: '',
        capital: 'test',
        description: 'test',
        population: 0,
        area: 0
    }

    const [flagDetails, setFlagDetails] = useState(initFlagDetails)

    type ICountry = {
        url: string;
        alpha3: string;
        difficulty: string;
        name: string;
        continent: string;
        file_url: string;
        license: string;
    }

    async function handleOpenFlagDetails(country:ICountry) {

        let countryDetails = {}
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${country.alpha3}`)
        const resObject = await res.json()

        if(resObject.length) {
            const countryOtherDetails = resObject[0]
            countryDetails = {
                ...country,
                area: countryOtherDetails.area,
                population: countryOtherDetails.population,
                capital: countryOtherDetails.capital[0]
            }
            console.log('Flag Data')
            console.log(countryOtherDetails, countryDetails)
        }

        // set flag details
        setFlagDetails((prev) => {
            return {
                ...prev,
                ...countryDetails
            }
        })
        setOpen(true)
    }

    let filteredCountries = countries.filter( country => {
        return selectedContinent === 'all' ? true  :  country.continent === selectedContinent
    })

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <Image className='m-auto border-2' src={flagDetails.file_url} width={300} height={300} alt={flagDetails.name}/>
                        <DialogTitle className='text-center text-lg'>{flagDetails.name}</DialogTitle>
                        <DialogDescription>
                            <div className="text-lg text-center">
                                <ul className='flag-details text-black'>
                                    <li><span className='font-bold'>Country Code:</span> {flagDetails.alpha3}</li>
                                    <li><span className='font-bold'>Capital:</span> {flagDetails.capital}</li>
                                    <li><span className='font-bold'>Continent:</span> {flagDetails.continent}</li>
                                    <li><span className='font-bold'>Population:</span> {flagDetails.population}</li>
                                    <li><span className='font-bold'>Area:</span> {flagDetails.area}</li>
                                    <li><span className='font-bold'>Description:</span> {flagDetails.description}</li>
                                </ul>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
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
                <div>
                </div>
                <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        filteredCountries.map((country, index) => {
                            return (
                                <div key={index}>
                                    <p className='text-md'>{country.name}</p>
                                    <div className='' onClick={ (e) => handleOpenFlagDetails(country)}>
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