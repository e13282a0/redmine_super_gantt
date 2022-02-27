import moment from 'moment'
export default {
    methods: {
        isToday:function(date) {
            let diff = moment().diff(date, 'hours');
            return diff > 0 && diff < 24
          },
          isWeekend:function(date) {
            return date.isoWeekday()>5
          }
    },
    computed:{

    }
};