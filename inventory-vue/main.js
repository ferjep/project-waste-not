const app = Vue.createApp({
    data() {
        return {
            items,
            searchInput: '',
            sort: {
                by: null,
                descending: true,
            },
            headRows: [
                { label: 'Item code', sortBy: null },
                { label: 'Product', sortBy: 'product' },
                { label: 'Package', sortBy: 'package_value' },
                { label: 'Available units', sortBy: 'available_units' },
                { label: 'Category', sortBy: 'category' },
                { label: 'Last updated', sortBy: 'last_updated' },
                { label: 'Edit available quantity', sortBy: null },
            ],
        }
    },
    methods: {
        formatNumbers(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        checkQtyInput(itemIndex, value) {
            let numString = value.replaceAll(',', '');

            if (!numString.length) {
                numString = '0'
            }

            if (!this.isNumeric(numString)) {
                return
            }

            const number = parseInt(numString)
            const item = this.items[itemIndex]

            if (item.available_units !== number) {
                item.available_units = number
                item.last_updated = this.getCurrentDate()
            }
        },

        getCurrentDate() {
            return new Date().toJSON().slice(0, 19).replace('T', ' ')
        },

        isNumeric(value) {
            return /^\d+$/.test(value)
        },
        applySearchFilter(items) {
            const search = this.searchInput.toLowerCase()

            if (!search) {
                return items
            }

            return items.filter(item => {
                return item.code.toLowerCase().includes(search)
                    || item.product.toLowerCase().includes(search)
                    || item.category.toLowerCase().includes(search)
            })
        },
        applySort(items) {
            const sortBy = this.sort.by
            const descending = this.sort.descending

            if (!sortBy) {
                return items
            }

            return items.sort((a, b) => {
                let valueA = a[sortBy]
                let valueB = b[sortBy]

                if (sortBy === 'last_updated') {
                    valueA = new Date(valueA).getTime()
                    valueB = new Date(valueB).getTime()
                }

                if (valueA < valueB) {
                    return descending ? -1 : 1
                }

                if (valueA > valueB) {
                    return descending ? 1 : -1
                }

                return 0
            });
        },

        sortDesc() {
                if (valueA < valueB) {
                    return -1
                }

                if (valueA > valueB) {
                    return 1
                }

                return 0
        },

        sortAsc() {
        },

        setSortBy(by) {
            const sort = { by }

            if (this.sort.by) {
                sort.descending = !this.sort.descending
            }

            this.sort = sort
        }
    },

    computed: {
        finalItems() {
            const items = this.applySearchFilter(this.items)

            return this.applySort(items)
        }
    }
});

app.mount('#app')
