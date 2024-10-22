import DogProfileForm from '../../components/DogProfileForm/DogProfileForm';
import trasition from '../../components/Transition/transition';
import './CreateDogProfile.module.css';

function CreateDogProfile() {
  return (
    <div className="create-profile-page">
      <DogProfileForm />
    </div>
  );
}

export default trasition(CreateDogProfile);