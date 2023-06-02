<script setup>
    import { ref } from 'vue'
    const isCCref = ref(true)
    const rate = ref(5)
    const isSending = ref(false)
    const isSent = ref(false)

    const sendMsg = async(x) => {
        // console.log(x);
        // const { data } = await useFetch('/api/nodemailer')
        // console.log(data);
        isSending.value = true
        $fetch(
            '/api/nodemailer',
            {
                method: 'post',
                body: {
                    from: "👻 " + x.name + ' ' + x.email||"", // sender address
                    to: "zulfidly@gmail.com", // list of receivers
                    cc: x.email||'', 
                    subject: x.name + " : Portfolio Contact Form", // Subject line
                    text: "text", // plain text body
                    html: `
                        <table style="border-collapse:separate; border-spacing:0px; color:#050c17; border:1px solid #242f40; ">
                            <tr>
                                <td style="text-align:center; padding:10px; border:1px solid; font-size:16px; font-weight:bold; border-top-left-radius: 7px;">Name</td>
                                <td style="padding:10px; border:1px solid; font-size:16px; border-top-right-radius: 7px;"> ${x.name}</td>
                            </tr>
                            <tr>
                                <td style="text-align:center; padding:10px; border:1px solid; font-size:16px; font-weight:bold;"> Email</td>
                                <td style="padding:10px; border:1px solid; font-size:16px;"> ${x.email||'not provided'} </td>
                            </tr>
                            <tr>
                                <td style="text-align:center; padding:10px; border:1px solid; font-size:16px; font-weight:bold;"> Rating </td>
                                <td style="padding:10px; border:1px solid; font-size:16px;"> ${x.rating} / 10 </td>
                            </tr>
                            <tr>
                                <td style="text-align:center; padding:10px; border:1px solid; font-size:16px; font-weight:bold; border-bottom-left-radius: 7px;"> Message</td>
                                <td style="padding:10px; border:1px solid; font-size:16px; border-bottom-right-radius: 7px;"> ${x.message} </td>
                            </tr>
                        </table>
                    `
                }                 
            }
        ).then((resp) => {
            isSending.value = false
            isSent.value = true
            setTimeout(()=> { isSent.value = false}, 3000)
            // console.log(resp)
        })
    }

</script>

<!-- #default="{value}" -->
<template>
    <div class="w-full flex flex-col justify-center items-center">
        <FormKit
            id="contactForm"
            type="form"
            :submit-label=" isSending ? 'Sending' : 'Send' "
            :submit-attrs="{
            'suffix-icon': isSending ? 'spinner' : 'submit',
            'wrapperClass' : isSending ? '$reset mt-8 [&>button>span:first-child]:animate-spin' : '$reset mt-8',
        }"

          @submit="(value)=> { sendMsg(value); $formkit.reset('contactForm') }"
          form-class="$reset min-w-[340px]"
          message-class="$reset hidden"
        >          
            <FormKit
                type="text"
                name="name"
                label=""
                placeholder="what is your name ?"
                validation="required"
                message-class="$reset text-end text-red-400 absolute top-full right-0"
                input-class="$reset appearance-none bg-transparent webkit-autofill:bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-3 py-2 border-none text-base placeholder-gray-400 text-[var(--color-text)] transition-all duration-300"
            />
            <br>            
            <FormKit
                type="textarea"
                name="message"
                rows="3"
                label=""
                placeholder="what do you want to say ?"
                validation="required"
                message-class="$reset text-end text-red-400 absolute top-full right-0"
                input-class="$reset appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none block w-full h-32 px-3 py-3 border-none text-base placeholder-gray-400 focus:shadow-outline text-[var(--color-text)]"    
            />
            <br>
            <FormKit
                v-model="rate"
                type="range"
                name="rating"
                prefix-icon="sad"
                value="5"
                min="1"
                max="10"
                suffix-icon="heart"
                :label=" 'Rate my portfolio site : ' + rate + ' /10'"
                wrapper-class="$reset space-y-4"
                input-class="$reset rounded-full w-full h-2 p-0"
                help-class="text-[var(--color-text)]"
                label-class="$reset mb-4 text-md"
            />
            <br>
            <br>

            <FormKit
                type="checkbox"
                label="send me a copy of this message"
                name="isCC"
                decorator-icon="check"
                label-class="$reset select-none pl-3 flex items-center [&>span:first-child]:text-[var(--color-text)]"
                :value="isCCref"
                @click="isCCref = !isCCref"
                decorator-class="$reset block relative h-5 w-5 mr-2 rounded bg-transparent ring-1 ring-gray-400 peer-checked:ring-blue-500 text-transparent peer-checked:text-blue-500"
            />
            <FormKit
                type="email"
                name="email"
                :disabled="isCCref ? false : true"
                prefix-icon="email"
                placeholder="email address"
                :validation="isCCref ? 'required|email' : '' "
                message-class="$reset text-end text-red-400 absolute top-full right-0"
                prefix-icon-class="$reset w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-400 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto"
                input-class="$reset appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-3 py-2 border-none text-base text-[var(--color-text)] placeholder-gray-400"
                />
            <!-- <pre wrap class="overflow-scroll"> {{ value }}</pre> -->
            
        </FormKit>
        <p class="text-md text-[var(--color-text)] transition-all duration-200" :class=" isSent ? 'opacity-100' : 'opacity-0' ">Message sent !</p>
    </div>
</template>

<style>
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
    /* border: 1px solid green; */
    -webkit-text-fill-color: var(--color-text);
    /* -webkit-box-shadow: 0 0 0px 1000px #000 inset; */
    transition: background-color 5000s ease-in-out 0s;
    }
</style>