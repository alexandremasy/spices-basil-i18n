export default {
  name: 'i18n-datetime',
  functional: true,
  props: {
    day: {
      type: String
    },

    era: {
      type: String
    },

    hour: {
      type: String
    },

    locale: {
      type: String
    },

    minute: {
      type: String
    },

    month: {
      type: String
    },

    second: {
      type: String
    },

    tag: {
      type: [String, Boolean, Object],
      default: 'span'
    },

    timezone: {
      type: String
    },

    value: {
      type: Date
    },

    weekday: {
      type: String
    },

    year: {
      type: String
    }
  },

  render(h, { props, parent, data }) {
    let locale = props.locale || parent.$basil.i18n.locale
    let tag = (!!props.tag && props.tag !== true) || props.tag === false ? props.tag : 'span'
    let value = parent.$basil.i18n.date(props.value, {
      day: props.day,
      era: props.era,
      hour: props.hour,
      locale,
      minute: props.minute,
      month: props.month,
      second: props.second,
      style: parent.$basil.i18n.DateStyles.DATETIME,
      timezone: props.timezone,
      weekday: props.weekday,
      year: props.year
    })

    return tag ?
      h(tag, {
        attrs: data.attrs,
        'class': data['class'],
        staticClass: data.staticClass
      }, value) : value
  }
}