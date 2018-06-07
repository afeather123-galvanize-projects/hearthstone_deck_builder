document.addEventListener('DOMContentLoaded', () => {
    console.log('Working!');
    const form = document.getElementById('form');
    const health = document.getElementById('health');
    const attack = document.getElementById('attack');

    document.getElementById('type').addEventListener('change', e => {
        switch(e.target.value) {
            case 'Spell':
                health.style.display = 'none';
                attack.style.display = 'none';
                break;
            case 'Minion':
                health.style.display = 'inline';
                attack.style.display = 'inline';
                health.placeholder = 'Health';
                break;
            case 'Weapon':
                health.style.display = 'inline';
                attack.style.display = 'inline';
                health.placeholder = 'Durability';
            case 'Hero':    
                health.style.display = 'none';
                attack.style.display = 'none';
                break;
        }
    })
})