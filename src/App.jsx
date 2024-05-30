import NoProjectSelected from "./components/NoProjectSelected.jsx";
import NewProject from "./components/NewProject.jsx";
import SideBar from "./components/sideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx"
import { useState } from "react";
import Tasks from "./components/Tasks.jsx";
function App() {
  const [projectState , setProjectState] = useState(
    {
      selectedProjectId: undefined,
      projects:[],
      tasks: []
    }
  )

  function handleAddTask(text){
    setProjectState(prevState => {
      const taskID = Math.random()
      const newTask = {
        text:text,
        projectID: prevState.selectedProjectId,
        id: taskID
      };

      return {
        ...prevState,
        tasks: [newTask,...prevState.tasks ],
      };
    });
  }
  function handleDeleteTask(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task)=> task.id !== id)
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter((project)=> project.id !== prevState.selectedProjectId)
      }
    })
  }
  
  function handleSelectProject(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId:id
      }
    })
  }

  function handleStartAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId:null
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const idGen = Math.random()
      const newProject = {
        ...projectData,
        id: idGen
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
  let content = <SelectedProject
   project = {selectedProject} 
   onDelete = {handleDeleteProject} 
   onAddTask={handleAddTask} 
   onDeleteTask={handleDeleteTask}
   tasks = {projectState.tasks}
   />;

  if(projectState.selectedProjectId === null){
        content = <NewProject onAdd={handleAddProject}/>
  }else if (projectState.selectedProjectId === undefined){
      content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  //ss
  return (
    <main className="h-screen my-8 flex gap-8">
        <SideBar onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projectData={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}/> 
        {content}
    </main>
  );
}

export default App;
