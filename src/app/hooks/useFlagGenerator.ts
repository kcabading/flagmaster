import countries from '@/app/data/countries.json'
import useLocalStorage from './useLocalStorage'
import { useEffect, useState } from 'react'

const useFlagGenerator = function(flagCount: number) {

    const [usedFlags, setUsedFlags] = useLocalStorage('chosenFlags', '[]')
    const [flag, setGeneratedFlag] = useState<string>('')
    const [flagUrl, setFlagUrl] = useState<string>('')
    const [choices, setChoices] = useState<string[]>([])

    function generateFlagFromData() : { flagName: string, flagUrl: string} {
        let flagName: string, flagUrl: string
        let rand = Math.random() * countries.length
        rand = Math.floor(rand)
        flagName = decodeURI(countries[rand].name),
        flagUrl = decodeURI(countries[rand].file_url)
        return {
            flagName,
            flagUrl
        }
    }

    useEffect(() => {
        let options: string[] = []
        let generatedFlag: {flagName: string, flagUrl: string}        
        let parsedFlags = JSON.parse(usedFlags)
        do {
            generatedFlag = generateFlagFromData()
        } while (parsedFlags?.includes(generatedFlag.flagName))
        let {flagName, flagUrl} = generatedFlag
        // add the generated flag in the choices
        options.push(flagName)
        // generate other choices
        while(options.length < 4) {
            const { flagName: flagOption } = generateFlagFromData()
            !options.includes(flagOption) && options.push(flagOption)
        }
        setGeneratedFlag(flagName)
        setFlagUrl(flagUrl)
        // shuffle the choices
        setChoices(options.sort( () => Math.random() - 0.5))

    }, [flagCount])

    return { 
        flag,
        flagUrl,
        choices,
        usedFlags,
        setUsedFlags
    }
}

export default useFlagGenerator