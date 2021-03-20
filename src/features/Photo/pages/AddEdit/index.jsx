import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, updatePhoto } from 'features/Photo/PhotoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import './styles.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams(); //rra ve 1 object
  const isAddMode = !photoId; //dùng de kiem tra khi nào là add, khi nào edit

  const editedPhoto = useSelector(state => {
    const foundPhoto = state.photos.find(x => x.id === +photoId);
    //console.log({ photos: state.photos, photoId, foundPhoto }); //dong này de test thui hehe
    return foundPhoto;
  }
  );
  console.log({ photoId, editedPhoto, });

  const initialValues = isAddMode
    ?
    {
      title: "",
      categoryId: null,
      photo: "",
    }
    :
    editedPhoto;


  const handleSubmit = (values) => {
    return new Promise(resolve => {
      console.log('Form submit: ', values);

      setTimeout(() => {
        if (isAddMode) {
          const action = addPhoto(values);
          console.log(action);
          dispatch(action);
        } else {
          //do something here
          const action = updatePhoto(values);
          console.log(action);
          dispatch(action);
        }

        history.push('/photos');
        resolve(true);
      }, 2000);
    })

  }
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
}

export default AddEditPage;