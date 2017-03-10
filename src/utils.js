import mo from 'moment';

export function formatDate(date) {
  return date ? mo(date).format('MMM-YYYY') : 'Present'
}
