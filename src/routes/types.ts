
export type Person = {name: string, active?: boolean}
export type PersonList = Person[]

export type ListboxContext = {
    select_position: (changedPosition: number) => void,
    curpos: number | null,
    set_litem: (li: HTMLButtonElement, i: number) => void,
    length: number,
    log(): void
}

export type LitemUseProps = {
    listbox: ListboxContext,
    position: number,
    set_active: (active: boolean) => void,
    onactivate?: (e: Event) => void
}