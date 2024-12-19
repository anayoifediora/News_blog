const dayjs = require('dayjs');

module.exports = {
    formatDate: (date) => { 
        
        return dayjs(date).format('MMMM D, YYYY');
        
        
    },
    
    formatText: (description) => {
        return description.split(' ').slice(0, 30).join(' ');
    },

    formatDescription: (text) => {
        return text.split('\n').map(item => `<p class = 'ps-3 pe-3'>${item}</p>`).join('')
    }
    
}

