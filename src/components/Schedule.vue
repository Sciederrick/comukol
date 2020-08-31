<template>
  <div class="w-full lg:ml-20 border border-gray-100 rounded font-sans" id="Schedule">
    <popover name="info">
      <p class="text-sm">Notify the team member of the delegated task<fa-icon :icon="['fas', 'bell']" size="1x" color="gold" class="ml-2"/></p>
    </popover>
    <popover name="submit">
      <p class="text-sm">The corresponding team member receives the delegated task on his Interface alongside a text(USSD/Email) notification<fa-icon :icon="['fas', 'mobile-alt']" size="1x" color="gold" class="ml-2"/></p>
    </popover>
    <p class="text-right text-xs text-underline text-green-500 p-2" v-popover.bottom="{name: 'submit', event: 'hover'}">Guide</p>
    <div class="flex flex-row flex-no-wrap overflow-x-auto text-left" style="height:500px">
      <div class="flex flex-col overflow-y-auto">
        <div class="flex-grow h-6 p-1 pt-2 bg-gray-200 border border-white">
          POSITION/ROLE
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="text" placeholder="Lab Technician" class="w-full">
          <p>
            <fa-icon :icon="['fas', 'trash-alt']" size="1x" color="red"/>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="text" placeholder="EHO" class="w-full">
          <p>
            <fa-icon :icon="['fas', 'trash-alt']" size="1x" color="red"/>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="text" placeholder="Epidemiologist" class="w-full">
          <p>
            <fa-icon :icon="['fas', 'trash-alt']" size="1x" color="red"/>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="text" placeholder="Clinician" class="w-full">
          <p>
            <fa-icon :icon="['fas', 'trash-alt']" size="1x" color="red"/>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="text" placeholder="CHV" class="w-full">
          <p>
            <fa-icon :icon="['fas', 'trash-alt']" size="1x" color="red"/>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="text" placeholder="RRT" class="w-full">
          <p>
            <fa-icon :icon="['fas', 'trash-alt']" size="1x" color="red"/>
          </p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex-grow h-6 p-1 pt-2 bg-gray-200 border border-white">
          Define Task
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6">
          <textarea class="text-xs font-mono pl-1" rows="3" cols="20" placeholder="collect samples from suspects at Longisa CRH..."></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6">
          <textarea class="text-xs font-mono pl-1" rows="3" cols="20" placeholder="collect samples from suspects at Longisa CRH..."></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6">
          <textarea class="text-xs font-mono pl-1" rows="3" cols="20" placeholder="mapping of confirmed cases - geographical distribution..."></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6">
          <textarea class="text-xs font-mono pl-1" rows="3" cols="20" placeholder="document all suspected cases manifesting cholera symptoms..."></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6">
          <textarea class="text-xs font-mono pl-1" rows="3" cols="20" placeholder="conduct community cholera awareness in the village..."></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6">
          <textarea class="text-xs font-mono pl-1" rows="3" cols="20" placeholder="organize a strategy meeting..."></textarea>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex-grow h-6 p-1 pt-2 bg-gray-200 border border-white">
          Timeline
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="date">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="date">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="date">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="date">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="date">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <input type="date">
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex-grow h-6 p-1 pt-2 bg-gray-200 border border-white">
          Notify
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-4 my-2 hover:bg-green-600" v-popover.bottom="{name: 'info', event: 'hover'}">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-4 my-2 hover:bg-green-600" v-popover.bottom="{name: 'info', event: 'hover'}">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-4 my-2 hover:bg-green-600" v-popover.bottom="{name: 'info', event: 'hover'}">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-4 my-2 hover:bg-green-600" v-popover.bottom="{name: 'info', event: 'hover'}">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-4 my-2 hover:bg-green-600" v-popover.bottom="{name: 'info', event: 'hover'}">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-4 my-2 hover:bg-green-600" v-popover.bottom="{name: 'info', event: 'hover'}">notify</button>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex-grow h-6 p-1 pt-2 bg-gray-200 border border-white">
          Status
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <p class="inline-block w-full bg-red-400 text-sm text-white p-4">
            Task Pending
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <p class="inline-block w-full bg-green-400 text-sm text-white p-4">
            Task Complete
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <p class="inline-block w-full bg-red-400 text-sm text-white p-4">
            Task Pending
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <p class="inline-block w-full bg-orange-400 text-sm text-white p-4">
            Task Postponed
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <p class="inline-block w-full bg-green-400 text-sm text-white p-4">
            Task Complete
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-6 p-1 pt-2">
          <p class="inline-block w-full bg-green-400 text-sm text-white p-4">
            Task Complete
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>
