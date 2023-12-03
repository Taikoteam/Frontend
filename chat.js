/**
 * Clase que representa un cuadro de chat.
 * @class
 */
class Chatbox {
/**
   * Crea una instancia de Chatbox.
   * @constructor
   */
constructor() {
    /**
     * Argumentos necesarios para la configuración del cuadro de chat.
     * @property {Object} args - Objeto que contiene referencias a elementos DOM.
     * @property {HTMLElement} args.openButton - Botón que abre el cuadro de chat.
     * @property {HTMLElement} args.chatBox - Contenedor del cuadro de chat.
     * @property {HTMLElement} args.sendButton - Botón de envío de mensajes.
     */
    this.args = {
    openButton: document.querySelector('.chatbox__button'),
    chatBox: document.querySelector('.chatbox__support'),
    sendButton: document.querySelector('.send__button'),
    };

    /**
     * Estado del cuadro de chat, true si está abierto, false si está cerrado.
     * @type {boolean}
     */
    this.state = false;

    /**
     * Lista de mensajes en el cuadro de chat.
     * @type {Array<Object>}
     */
    this.messages = [];
}

/**
   * Muestra el cuadro de chat y establece los manejadores de eventos.
   * @method
   * @returns {void}
   */
display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener('click', () => this.toggleState(chatBox));

    sendButton.addEventListener('click', () => this.onSendButton(chatBox));

    const node = chatBox.querySelector('input');
    node.addEventListener('keyup', ({ key }) => {
    if (key === 'Enter') {
        this.onSendButton(chatBox);
    }
    });
}

/**
   * Alterna el estado del cuadro de chat entre abierto y cerrado.
   * @method
   * @param {HTMLElement} chatbox - Elemento DOM que representa el cuadro de chat.
   * @returns {void}
   */
toggleState(chatbox) {
    this.state = !this.state;

    // Muestra u oculta el cuadro de chat
    if (this.state) {
    chatbox.classList.add('chatbox--active');
    }
    else {
    chatbox.classList.remove('chatbox--active');
    }
}

/**
   * Maneja el evento de clic en el botón de enviar mensaje.
   * @method
   * @param {HTMLElement} chatbox - Elemento DOM que representa el cuadro de chat.
   * @returns {void}
   */
onSendButton(chatbox) {
    var textField = chatbox.querySelector('input');
    let text1 = textField.value;
    if (text1 === '') {
    return;
    }

    let msg1 = { name: 'User', message: text1 };
    this.messages.push(msg1);

    fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    body: JSON.stringify({ message: text1 }),
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then((r) => r.json())
    .then((r) => {
        let msg2 = { name: 'Sam', message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = '';
    })
    .catch((error) => {
        console.error('Error:', error);
        this.updateChatText(chatbox);
        textField.value = '';
    });
}

/**
   * Actualiza el contenido del cuadro de chat con los mensajes actuales.
   * @method
   * @param {HTMLElement} chatbox - Elemento DOM que representa el cuadro de chat.
   * @returns {void}
   */
updateChatText(chatbox) {
    var html = '';
    this.messages.slice().reverse().forEach(function (item, index) {
    if (item.name === 'Sam') {
        html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
    }
    else {
        html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
    }
    });

    const chatmessage = chatbox.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;
}
}

// Instancia de la clase Chatbox y muestra el cuadro de chat
const chatbox = new Chatbox();
chatbox.display();
