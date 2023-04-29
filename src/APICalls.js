import Axios from "axios";

const axiosClient = Axios.create({
  baseURL: "http://localhost:5000/",

});


export const getAllTestpersons = async () => {
    try {
      const res = await axiosClient.get("/persons");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export const getAllBookings = async () => {
    try {
      const res = await axiosClient.get("/bookings");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function deleteBooking(testpersonId){
    try {
      axiosClient.delete(`/bookings/${testpersonId}`);
    } catch (err) {
      console.log(err);
    }
  };

  export async function newBooking(logRef, testpersons, userId){
    try {
      axiosClient.post(`/persons`, {logRef: logRef, testpersons: testpersons, userId: userId});
    } catch (err) {
      console.log(err);
    }
  };

  export async function updateBooking(logRef, testpersons, userId){
    try {
      axiosClient.put(`/bookings`, {logRef: logRef, testpersonId: testpersons, userId: userId});
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getAllUsers = async () => {
    try {
      const res = await axiosClient.get("/users");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function getUser (userId) {
    try {
      const res = await axiosClient.get(`/users/${userId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

 export async function deleteUser(userId){
    try {
      axiosClient.delete(`/users/delete/${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  export async function newUser(name, shortName, group){
    try {
      axiosClient.post(`/users`, {fullname: name, shortName: shortName, group: group});
    } catch (err) {
      console.log(err);
    }
  };

  export async function updateUser(name, shortName, userId, groupId){
    try {
      axiosClient.put(`/users`, {fullname: name, shortName: shortName, userId: userId, groupId: groupId});
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getAllGroups = async () => {
    try {
      const res = await axiosClient.get("/groups");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function getGroup (id) {
    try {
      const res = await axiosClient.get(`/groups/${id}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function deleteGroup(groupId){
    try {
      axiosClient.delete(`/groups/delete/${groupId}`);
    } catch (err) {
      console.log(err);
    }
  };

  export async function newGroup(name, shortName){
    try {
      axiosClient.post(`/groups`, {fullname: name, shortName: shortName});
    } catch (err) {
      console.log(err);
    }
  };

  export async function updateGroup(name, shortName, groupId){
    try {
      axiosClient.put(`/groups`, {fullname: name, shortName: shortName, groupId: groupId});
    } catch (err) {
      console.log(err);
    }
  };


  export async function searchBasedOnTestpersonId(testpersonId) {
    try {
      const res = await axiosClient.get(`/search/${testpersonId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function searchBasedOnAgeSpan(min, max) {
    try {
      const res = await axiosClient.get(`/search/ageSpan/${min}/${max}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function searchBasedOnBirthYear(min, max) {
    try {
      const res = await axiosClient.get(`/search/birthYear/${min}/${max}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function searchBookingsBasedOnGroup(group) {
    try {
      const res = await axiosClient.get(`/search/basedOnGroup/${group}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };