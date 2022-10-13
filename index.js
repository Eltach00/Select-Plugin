import { Select } from "./sel/select"
import './sel/style.scss'


const select = new Select('#select', {
    placeHolder: 'Select an item',
    data: [
        { id: 1, value: 'React'},
        { id: 2, value: 'Vue'},
        { id: 3, value: 'React'},
        { id: 4, value: 'Nuxt'},
        { id: 5, value: 'JQuery'}
    ]
})

window.s = select