import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* bookableItemSaga() {
    yield takeEvery('FETCH_BOOKABLE_ITEM', fetchBookableItem);
    yield takeEvery('POST_BOOKABLE_ITEM', postBookableItem);
    yield takeEvery('POST_PHOTO', postPhoto)
}

function* fetchBookableItem() {
    try {
        const result = yield axios.get(`/api/bookableItem`)
        console.log('data got back from server', result.data)
        yield put({
            type: 'SET_BOOKABLE_ITEM_LIST', 
            payload: result.data
        })
    }
    catch {

    }
}; //end of fetchBookableItem

function* postPhoto(action) {
    const headers = {
        'content-type': 'multipart/form-data'
    }

    const imageForm = new FormData();
    imageForm.append('image', action.payload.selectedFile)
    const res = yield axios({
        method: 'POST', 
        url: 'api/images', 
        headers: headers, 
        data: imageForm
    })
    console.log('res is ', res);
    
    /* yield put({
        type: 'FETCH_PHOTOS'
    }) */
}


function* postBookableItem(action) {
    console.log('post bookableItem saga', action.payload);
    try {
        yield axios.post(`/api/bookableItem`, action.payload);
        yield put({
            type: 'FETCH_BOOKABLE_ITEM'
        })
    }
    catch {
        console.log('ERROR in POST BookableItem saga')
    } 
}; // end of postBookableItem

export default bookableItemSaga;