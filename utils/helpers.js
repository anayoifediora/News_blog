const dayjs = require('dayjs');

module.exports = {
    formatDate: (date) => { 
        
        return dayjs(date).format('MMMM D, YYYY');
        
        
    },
    
    formatText: (description) => {
        return description.split(' ').slice(0, 30).join(' ');
    },
    
}

