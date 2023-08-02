import PropTypes from 'prop-types';
const url = 'https://pixabay.com/api/';
const key = '38328283-3432d4ee282ba2126186b7660';

export const GetImages = (value, page) => {
return fetch(`${url}?q=${value}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
}

GetImages.propTypes = {
    value: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired
}