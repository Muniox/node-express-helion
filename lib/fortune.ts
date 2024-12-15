const fortuneCookies = [
    "Pokonaj swoje lęki abo one pokonają ciebie.",
    "Rzeki potrzebują źródeł.",
    'Nie obawiaj się nieznanego',
    "Oczekuj przyjemnej niespodzianki.",
    "Zawsze szukaj prostego rozwiązania."
]

export const getFortune = () => {
    return fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)]
}
