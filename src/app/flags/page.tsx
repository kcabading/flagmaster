
import countries from '@/data/countries.json'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Image from 'next/image'

const Flags = async () => {

    const session = await getServerSession(authOptions);
    console.log('SESSION', session)

    return (
        <>
            <div className='lg:w-3/4 max-lg:px-4 w-full'>
                <h1 className='font-bold mb-2 text-2xl'>List of Flags</h1>
                <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        countries.map((country, index) => {
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