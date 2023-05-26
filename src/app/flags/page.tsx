
import countries from '@/app/data/countries.json'
import Image from 'next/image'

const Flags = () => {

    // let flagName: string, flagUrl: string
    //     let rand = Math.random() * countries.length
    //     rand = Math.floor(rand)
        
        // return {
        //     flagName,
        //     flagUrl
        // }

        // flagName = decodeURI(countries[rand].name),
        // flagUrl = decodeURI(countries[rand].file_url)

    return (
        <>
            <div className='lg:w-3/4 max-lg:px-4'>
                <h1 className='font-bold mb-2 text-2xl'>List of Flags</h1>
                <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        countries.map( (country, index) => {
                            return (
                                <div key={index}>
                                    <p className='text-md'>{country.name}</p>
                                    <div className=''>
                                        <Image src={country.file_url} width={300} height={300} alt={country.name} className='border-2 hover:drop-shadow-lg' />
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