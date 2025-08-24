import zh from '../locales/zh.yml'
import en from '../locales/en.yml'
import get from 'lodash/get'
import { PandaConfig } from '../config.js'
const { defaultLocale } = PandaConfig

// TODO cofigure the i18n

// This is a simple i18n implementation
const useLocalePath = (lang: string) => {
    lang ??= ''
    if (lang === 'ja') {
        lang = ''
    }
    lang = '' // force to default language
    const start = lang ? '/en' : ''
    return (path: string) => {
        let url = start + path
        if (!url.endsWith('/')) url += '/'
        return url
    }
}

const useTranslation = (lang: string) => {
    if (!lang) lang = 'ja'
    return (key: string) => {
        const data = lang === 'ja' ? [ja, en] : [en, ja]
        const r = get(data[0], key)
        if (!r) {
            console.warn(`Translation for "${key}" not found`)
            return key.split('.').pop()
        }
        return r
    }
}

export const useLocale = (url: URL) => {
    const locale = defaultLocale // force to default language
    return {
        path: useLocalePath(locale),
        t: useTranslation(locale),
        locale
    }
}
