import {SELECTED_NOTES, SEARCH_NOTES, UPDATE_NOTE, DELETE_NOTE, ADD_NOTE} from '../constants/';

export const openNote = id => ({
	type : SELECTED_NOTES,
	id
})

export const noteSearch = (searchTerm) => ({
    type: SEARCH_NOTES,
    searchTerm
})
export const deleteNote = id => ({
    type: DELETE_NOTE,
    id
});
export const updateNote = (id, field, value) => ({
    type: UPDATE_NOTE,
    id: id,
    field: field,
    value: value
});


export const addNote = (id,title, color) => ({
	type: ADD_NOTE,
	id: id++,
	color:"danger",
	title: "This is new Note"	
});