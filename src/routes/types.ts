
export type Person = {name: string, active?: boolean}
export type ListItems = Person[]

export type ListboxContext = {
    updateItems: (changedPosition: number) => void,
    curpos: number,
    set_litem: (li: HTMLButtonElement, i: number) => void
}

export type LitemUseProps = {
    listbox: ListboxContext,
    position: number,
    set_active: (active: boolean) => void,
    onactivate?: (e: Event) => void
}