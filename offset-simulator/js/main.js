let simulator;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    simulator = new OffsetSimulator();
});

// Funções globais para chamadas do HTML
function showPasswordModal() {
    simulator.showPasswordModal();
}

function closeModal() {
    simulator.closeModal();
}

function checkPassword() {
    simulator.checkPassword();
}

function createNewTarget() {
    simulator.createNewTarget();
}

function updateValue(color, value) {
    simulator.updateValue(color, value);
}

function printAttempt() {
    simulator.printAttempt();
}