import addressTmp from './AddressItem.pug'

export default class AddressItem {
    constructor({ address }) {
        this.address = address;
    }

    render() {
        const data = {
            text: this.address,
        }

        return addressTmp.call({}, { data })
    }
}