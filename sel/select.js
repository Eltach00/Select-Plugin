getTemplate = (options) => {
    const {placeHolder, data} = options

    const text = data.map( item => `<li class="select__item" data-type='item' data-id='${item.id}'>${item.value}</li>` ).join('')

    return /*html*/ `
    <div class="select__overlay" data-type='overlay'>
    </div>
    <div class="select__input" data-type='input'>
    <span data-type='placeHolder' >${placeHolder || 'Select something'}</span>
    <i class="fa fa-arrow-down" data-type="arrow"></i>
</div>
  <div class="select__dropdown">
    <ul class="select__list">
        ${text}
    </ul>
  </div>`
}


export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = null;
        this.#render()
        this.#setup()
    }

    #render () {
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(this.options)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$placeHolder = this.$el.querySelector('[data-type="placeHolder"]')
    }

    #setup () {
        this.clickHandleSelect = this.clickHandleSelect.bind(this)
        this.$el.addEventListener('click', this.clickHandleSelect )
    }

    clickHandleSelect(event) {
        const {type} = event.target.dataset;
        console.log(type)

        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            this.select(event.target.dataset.id)
            this.close()
        } else if (type === 'overlay') {
            this.close()
        }
    }

    select(id) {
        this.selectedId = id;
        const text = this.options.data.find( item => item.id == this.selectedId)
        this.$placeHolder.innerHTML = text.value

        this.$el.querySelectorAll('[data-type="item"]').forEach(item => {
            item.classList.remove('selected')
        });
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    open() {
        this.$el.classList.add('open')
        this.$arrow.classList.remove("fa-arrow-down")
        this.$arrow.classList.add("fa-arrow-up")
    }

    close() {
        this.$el.classList.remove('open')
        this.$arrow.classList.remove("fa-arrow-up")
        this.$arrow.classList.add("fa-arrow-down")
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandleSelect)
        this.$el.innerHTML = ''
    }


}