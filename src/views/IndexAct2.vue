<template>
    <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar></Sidebar>
  
      <main
        class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in"
      >
        <Header></Header>
  
        <div class="main-content flex flex-col flex-grow p-4 overflow-auto">
  
          <Act2></Act2>

        </div>
  
        <Footer></Footer>
      </main>
      
    </div>
  
    <router-view></router-view>
  </template>
  

  