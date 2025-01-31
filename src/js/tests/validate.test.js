import { validateWidget } from "../widget/validate";

describe('validateWidget', () => {
    document.body.innerHTML = '<main class="main"></main>'
    const main = document.querySelector('.main')
    const widget = new validateWidget(main);
    
    widget.bindToDom();
    const form = main.querySelector('form');
    const input = form.querySelector('input');
    const button = form.querySelector('button');

    test('Widget should identificated success number card', () => {
        input.value = '4556539332865895';
        form.submit();''

        widget.getCardNumber();
        const isValid = widget.validateAlgorithm();

        expect(isValid).toBe(true);
    })

    test('Widget should identificated unsuccess number card', () => {
        input.value = '13613515';
        form.submit();

        widget.getCardNumber();
        const isValid = widget.validateAlgorithm();

        expect(isValid).toBe(false);
    })

    test('Widget should identificated Mastercard', () => {
        const cards = ['5156489880134560', '373858645667445', '4556539332865895', '2200123456789010', '3531209071422983'];
        const typeCards = ['mastercard', 'american express', 'visa', 'mir', 'jcb']
        let isValidCard = [];
        
        cards.forEach(card => {
            input.value = card;
            form.submit();

            widget.getCardNumber();
            widget.validateAlgorithm();
            const isType = widget.validateCardType();
            isValidCard.push(isType);
        });
        
        expect(isValidCard).toEqual(typeCards)
    })
})