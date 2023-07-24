'use client'

import countries from '@/data/countries.json'
import { useState } from 'react';
import Image from 'next/image'
import { useSearchParams, usePathname } from "next/navigation"
import { Skeleton } from '@/components/ui/skeleton';

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
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"


interface IPageProps {
    params: { id: string }
}

const continents = ['All Continents','Asia','Africa','Europe','North America','South America','Oceania']

const Flags =  (props: IPageProps) => {

    const searchParams = useSearchParams()

    const filterByContinent = searchParams.has('continent') ? searchParams.get('continent') : continents[0]
    const [selectedContinent, setSelectedContinent] = useState(filterByContinent)
    const [open, setOpen] = useState(false);
    const [isLoadingCountry, setIsLoadingCountry] = useState(false)

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
        setFlagDetails( (prev) => {
            return {
                ...initFlagDetails,
                file_url: country.file_url,
                name: country.name
            }
        })
        setIsLoadingCountry(true)
        setOpen(true)
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
            // set flag details
            setFlagDetails((prev) => {
                return {
                    ...prev,
                    ...countryDetails
                }
            })
            setIsLoadingCountry(false)
        }        
    }

    let filteredCountries = countries.filter( country => {
        return selectedContinent === 'All Continents' ? true  :  country.continent === selectedContinent
    })

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <Image className='m-auto border-2' src={flagDetails.file_url} width={300} height={300} alt={flagDetails.name}/>
                        <DialogTitle className='text-center text-xl'>{flagDetails.name}</DialogTitle>
                        
                            <div className="text-lg text-center">
                                { !isLoadingCountry ?
                                <ul className='flag-details text-black dark:text-white'>
                                    <li><span className='font-bold'>Country Code:</span> {flagDetails.alpha3}</li>
                                    <li><span className='font-bold'>Capital:</span> {flagDetails.capital}</li>
                                    <li><span className='font-bold'>Continent:</span> {flagDetails.continent}</li>
                                    <li><span className='font-bold'>Population:</span> {flagDetails.population}</li>
                                    <li><span className='font-bold'>Area:</span> {flagDetails.area}</li>
                                    <li><span className='font-bold'>Description:</span> {flagDetails.description}</li>
                                </ul>
                                :
                                <div className='text-center'>
                                    {
                                    Array.from(Array(6).keys()).map(( id ) => (
                                        <div key={id} className="flex items-center justify-center space-x-4 py-1">
                                            <div className="space-y-1 text-center flex-row justify-center">
                                                {
                                                id % 2 === 0
                                                ?
                                                    <Skeleton className="h-5 w-[200px]" />
                                                :
                                                    <Skeleton className="h-5 w-[250px]" />
                                                }
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                                }
                            </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className='lg:w-3/4 max-lg:px-4 w-full'>
                <div className='flex justify-between mb-5'>
                    <h1 className='font-bold mb-2 text-2xl'>List of Flags</h1>
                    <div>
                        <Select onValueChange={setSelectedContinent} defaultValue='All Continents'>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Continent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>By Continent</SelectLabel>
                                    {
                                        continents.map( (continent) => {
                                            return <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                                        })
                                    }
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