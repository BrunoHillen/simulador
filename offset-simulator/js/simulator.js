class OffsetSimulator {
    constructor() {
        this.target = null;
        this.attempts = 0;
        this.MAX_ATTEMPTS = 10;
        this.CORRECT_PASSWORD = "220481";
        this.isCurrentColorVisible = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.createNewTarget();
    }

    initializeElements() {
        this.elements = {
            modal: document.getElementById('passwordModal'),
            passwordInput: document.getElementById('passwordInput'),
            targetColor: document.getElementById('targetColor'),
            currentColor: document.getElementById('currentColor'),
            previousColors: document.getElementById('previousColors'),
            printCount: document.getElementById('printCount'),
            result: document.getElementById('result'),
            accuracy: document.getElementById('accuracy'),
            printButton: document.querySelector('button[onclick="printAttempt()"]'),
            sliders: {
                cyan: document.getElementById('cyan'),
                magenta: document.getElementById('magenta'),
                yellow: document.getElementById('yellow'),
                black: document.getElementById('black')
            },
            values: {
                cyan: document.getElementById('cyanValue'),
                magenta: document.getElementById('magentaValue'),
                yellow: document.getElementById('yellowValue'),
                black: document.getElementById('blackValue')
            }
        };
    }

    setupEventListeners() {
        this.elements.passwordInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') this.checkPassword();
            if (event.key === 'Escape') this.closeModal();
        });
    }

    showPasswordModal() {
        this.elements.modal.style.display = 'flex';
        this.elements.passwordInput.value = '';
        this.elements.passwordInput.focus();
    }

    closeModal() {
        this.elements.modal.style.display = 'none';
    }

    checkPassword() {
        const password = this.elements.passwordInput.value;
        if (password === this.CORRECT_PASSWORD) {
            this.isCurrentColorVisible = true;
            this.elements.currentColor.classList.remove('hidden');
            this.updateCurrentColor();
            this.closeModal();
        } else {
            alert('Senha incorreta!');
        }
    }

    createNewTarget() {
        this.target = {
            c: Math.round(Math.random() * 100),
            m: Math.round(Math.random() * 100),
            y: Math.round(Math.random() * 100),
            k: Math.round(Math.random() * 100)
        };
        
        this.elements.targetColor.style.backgroundColor = 
            ColorUtils.cmykToRgb(
                this.target.c,
                this.target.m,
                this.target.y,
                this.target.k
            );
        
        // Reset
        this.attempts = 0;
        this.elements.printCount.textContent = '0';
        this.elements.previousColors.innerHTML = '';
        this.elements.result.classList.add('hidden');
        this.elements.printButton.disabled = false;
        
        // Reset sliders
        Object.values(this.elements.sliders).forEach(slider => {
            slider.value = 0;
        });
        Object.values(this.elements.values).forEach(value => {
            value.textContent = '0%';
        });

        // Reset cor atual
        this.isCurrentColorVisible = false;
        this.elements.currentColor.classList.add('hidden');
    }

    updateValue(color, value) {
        this.elements.values[color].textContent = `${value}%`;
        this.updateCurrentColor();
    }

    updateCurrentColor() {
        if (!this.isCurrentColorVisible) return;
        
        const current = this.getCurrentValues();
        this.elements.currentColor.style.backgroundColor = 
            ColorUtils.cmykToRgb(
                current.c,
                current.m,
                current.y,
                current.k
            );
    }

    getCurrentValues() {
        return {
            c: parseInt(this.elements.sliders.cyan.value),
            m: parseInt(this.elements.sliders.magenta.value),
            y: parseInt(this.elements.sliders.yellow.value),
            k: parseInt(this.elements.sliders.black.value)
        };
    }

    printAttempt() {
        if (!this.target || this.attempts >= this.MAX_ATTEMPTS) return;

        const current = this.getCurrentValues();
        const accuracy = ColorUtils.calculateAccuracy(this.target, current);
        
        // Adiciona cor à grade
        const colorDiv = document.createElement('div');
        colorDiv.className = 'flex flex-col items-center';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'w-full h-16 rounded-lg border-2 mb-2';
        colorBox.style.backgroundColor = ColorUtils.cmykToRgb(
            current.c,
            current.m,
            current.y,
            current.k
        );
        
        const accuracyText = document.createElement('div');
        accuracyText.className = 'text-sm font-medium';
        accuracyText.textContent = `${Math.round(accuracy)}%`;
        
        colorDiv.appendChild(colorBox);
        colorDiv.appendChild(accuracyText);
        this.elements.previousColors.appendChild(colorDiv);

        // Mostra resultado
        this.elements.result.classList.remove('hidden');
        this.elements.accuracy.textContent = 
            `Precisão: ${Math.round(accuracy)}%`;

        // Atualiza contador
        this.attempts++;
        this.elements.printCount.textContent = this.attempts;
        
        if (this.attempts >= this.MAX_ATTEMPTS) {
            this.elements.printButton.disabled = true;
        }
    }
}