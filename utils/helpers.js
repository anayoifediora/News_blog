const dayjs = require('dayjs');

module.exports = {
    formatDate: (date) => { 
        
        return dayjs(date).format('dddd, MMMM D YYYY');
        
        
    },
    
    formatText: (description) => {
        return description.split(' ').slice(0, 10).join(' ');
    }

    
}

