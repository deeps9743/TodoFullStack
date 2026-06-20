import FirstComponent from './FirstComponent';
import ThirdComponent from './ThirdComponent';
import SecondComponent from './SecondComponent';
import LearningJavaScript from './learningJavaScript';
import ForthComponent from './ForthComponent';

export default function Learning_component() {
  return (
    <div className="Learning_component">
      My Todo Application up
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <ForthComponent />
      <LearningJavaScript />
    </div>
  );
}