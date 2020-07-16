import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'


// 
export const getToken = (params) => {
	return post(baseUrl.getToken, params)
}