import React,{ useRef, useEffect } from 'react';
import DoAssignmentContext from './../context/DoAssignmentContext';
import QuestionContext from './../context/QuestionContext';
import AssignmentService from './../services/assignment.service';

const useUnload = fn => {
    const cb = useRef(fn);
    const { assignment } = React.useContext(DoAssignmentContext)// eslint-disable-next-line
    const { question, setQuestion } = React.useContext(QuestionContext)
    useEffect(() => {
        cb.current = fn;

    }, [fn]);
    const options=()=>{
        // let user = JSON.parse(localStorage.getItem("user"))
        let _assignment = assignment
        delete _assignment.Questions
        let finalData = { ..._assignment, Questions: question }
        console.log(finalData)
        let assignmentService = AssignmentService.getInstance()
        assignmentService.submitAssignment(finalData)
            .then(items => {
                console.log(items)
            })
            .catch((err) => {
                console.error(err)
            });
    };
    useEffect(() => {
        const onUnload = (...args) => { cb.current?.(...args) };

        window.addEventListener("beforeunload", onUnload);
       
        return () => window.removeEventListener("beforeunload", onUnload , options);//eslint-disable-next-line
    }, []);
};

export default useUnload;