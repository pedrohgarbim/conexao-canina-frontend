import DogProfileForm from '../../components/DogProfileForm/DogProfileForm';
import trasition from '../../components/Transition/transition';
import './CreateProfile.module.css';

function CreateProfile() {
  return (
    <div className="create-profile-page">
      <DogProfileForm />
    </div>
  );
}

export default trasition(CreateProfile);
