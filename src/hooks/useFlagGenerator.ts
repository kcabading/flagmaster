import countries from '@/data/countries.json'
import useLocalStorage from './useLocalStorage'
import { useCallback, useState } from 'react'

const useFlagGenerator = function(flagCount: number, difficulty: string, continent: string) {

    const [usedFlags, setUsedFlags] = useLocalStorage('chosenFlags', '[]')
    const [flag, setGeneratedFlag] = useState<string>('')
    const [flagUrl, setFlagUrl] = useState<string>('')
    const [choices, setChoices] = useState<string[]>([])

    function generateFlagFromData () {
        let flagName: string, flagUrl: string, filteredCountries
        if (continent !== 'all') {
            filteredCountries = countries.filter( country => country.continent === continent)
        } else {
            filteredCountries = countries.filter( country => {
                return difficulty === 'all' ? true  :  country.difficulty == difficulty
            })
        }

        let rand = Math.random() * filteredCountries.length
        rand = Math.floor(rand)
        flagName = decodeURI(filteredCountries[rand].name),
        flagUrl = decodeURI(filteredCountries[rand].file_url)
        return {
            flagName,
            flagUrl
        }
    }

    function generateNewFlag() {
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
    }

    return { 
        flag,
        flagUrl,
        choices,
        usedFlags,
        setUsedFlags,
        generateNewFlag
    }
}

export default useFlagGenerator