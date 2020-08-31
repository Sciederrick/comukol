<template>
  <div class="w-full lg:ml-20 mx-auto border border-gray-100 rounded font-sans" id="Schedule">
    <div class="flex flex-row flex-no-wrap overflow-x-auto text-left" style="height:500px">
      <div class="flex flex-col overflow-y-auto">
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          POSITION
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          EHO
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          EPIDEMIOLOGY
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          CLINICIAN
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          CHV
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          RRT
        </div>
      </div>
      <div class="flex flex-col">
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          Define Task
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <textarea name="name" rows="3" cols="20"></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <textarea name="name" rows="3" cols="20"></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <textarea name="name" rows="3" cols="20"></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <textarea name="name" rows="3" cols="20"></textarea>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <textarea name="name" rows="3" cols="20"></textarea>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          Timeline
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <input type="date" name="" value="">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <input type="date" name="" value="">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <input type="date" name="" value="">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <input type="date" name="" value="">
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <input type="date" name="" value="">
        </div>
      </div>
      <div class="flex flex-col">
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          Notify
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-2">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-2">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-2">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-2">notify</button>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <button class="btn bg-green-400 text-white rounded p-1 mx-2">notify</button>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          Status
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <p class="inline-block">
            <input type="radio" value="true" v-model="dailyReport" class="px-1 self-center" id="DailyReport">
            <label for="DailyReport" class="pl-1 pr-2 self-center text-xs md:text-sm">complete</label>
          </p>
          <p class="inline-block">
            <input type="radio" value="true" v-model="situationalReport" class="px-1 self-center" id="SituationalReport">
            <label for="SituationalReport" class="pl-1 pr-2 self-center text-xs md:text-sm">postpone</label>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <p class="inline-block">
            <input type="radio" value="true" v-model="dailyReport" class="px-1 self-center" id="DailyReport">
            <label for="DailyReport" class="pl-1 pr-2 self-center text-xs md:text-sm">complete</label>
          </p>
          <p class="inline-block">
            <input type="radio" value="true" v-model="situationalReport" class="px-1 self-center" id="SituationalReport">
            <label for="SituationalReport" class="pl-1 pr-2 self-center text-xs md:text-sm">postpone</label>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <p class="inline-block">
            <input type="radio" value="true" v-model="dailyReport" class="px-1 self-center" id="DailyReport">
            <label for="DailyReport" class="pl-1 pr-2 self-center text-xs md:text-sm">complete</label>
          </p>
          <p class="inline-block">
            <input type="radio" value="true" v-model="situationalReport" class="px-1 self-center" id="SituationalReport">
            <label for="SituationalReport" class="pl-1 pr-2 self-center text-xs md:text-sm">postpone</label>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <p class="inline-block">
            <input type="radio" value="true" v-model="dailyReport" class="px-1 self-center" id="DailyReport">
            <label for="DailyReport" class="pl-1 pr-2 self-center text-xs md:text-sm">complete</label>
          </p>
          <p class="inline-block">
            <input type="radio" value="true" v-model="situationalReport" class="px-1 self-center" id="SituationalReport">
            <label for="SituationalReport" class="pl-1 pr-2 self-center text-xs md:text-sm">postpone</label>
          </p>
        </div>
        <div class="border border-gray-200 border-dashed flex-grow h-20 p-1 pt-2">
          <p class="inline-block">
            <input type="radio" value="true" v-model="dailyReport" class="px-1 self-center" id="DailyReport">
            <label for="DailyReport" class="pl-1 pr-2 self-center text-xs md:text-sm">complete</label>
          </p>
          <p class="inline-block">
            <input type="radio" value="true" v-model="situationalReport" class="px-1 self-center" id="SituationalReport">
            <label for="SituationalReport" class="pl-1 pr-2 self-center text-xs md:text-sm">postpone</label>
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
