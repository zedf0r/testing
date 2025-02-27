import { validateWidget } from "../widget/validate";

describe('validateWidget', () => {
    document.body.innerHTML = '<main class="main"></main>'
    const main = document.querySelector('.main')
    const widget = new validateWidget(main);
    
    widget.bindToDom();
    const form = main.querySelector('form');
    const input = form.querySelector('input');

    test('Widget should identificated success number card', () => {
        input.value = '4556539332865895';
        widget.getCardNumber();
        widget.validateAlgorithm();

        const attribute = form.getAttribute('data-status');

        expect(attribute).toBe('true');
    })

    test('Widget should identificated unsuccess number card', () => {
        input.value = '13613515';

        widget.getCardNumber();
        widget.validateAlgorithm();
        const attribute = form.getAttribute('data-status');

        expect(attribute).toBe('false');
    })

    test('Widget should identificated Mastercard', () => {
        const cards = ['5156489880134560', '373858645667445', '4556539332865895', '2200123456789010', '3531209071422983'];
        const typeCards = ['mastercard', 'american express', 'visa', 'mir', 'jcb']
        let isValidCard = [];
        const cardsHtml = document.querySelectorAll('[data-card]');
        cards.forEach(card => {
            input.value = card;
            widget.getCardNumber();
            widget.validateAlgorithm();
            widget.validateCardType();
            cardsHtml.forEach(item => {
                const attributeActive = item.getAttribute('data-active');
                if (attributeActive) {
                    const attributeName = item.getAttribute('data-card')
                    isValidCard.push(attributeName);
                }
            })
        });
        
        expect(isValidCard).toEqual(typeCards)
    })
})