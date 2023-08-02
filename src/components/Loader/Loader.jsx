import { FidgetSpinner } from 'react-loader-spinner';
import css from '../../Styles.module.css';

export default function Loader() {
  return (
    <div className={css.spin}>
    <FidgetSpinner
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  ballColors={['#ff0000', '#00ff00', '#0000ff']}
      backgroundColor="#F4442E"      
       /></div>)
  
}