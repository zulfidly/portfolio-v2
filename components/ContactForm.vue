<script setup>
    import { ref } from 'vue'
    
    const rate = ref(5)
    const sendMsg = (x) => {
        // console.log(x);
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
                        <table style="border-collapse:separate; border-spacing:5px;">
                            <tr>
                                <td style="text-align:center; padding:10px; border:1px solid; font-size:16px; font-weight:bold; border-top-left-radius: 15px;">Name</td>
                                <td style="padding:10px; border:1px solid; font-size:16px; border-top-right-radius: 15px;"> ${x.name}</td>
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
                                <td style="text-align:center; padding:10px; border:1px solid; font-size:16px; font-weight:bold; border-bottom-left-radius: 15px;"> Message</td>
                                <td style="padding:10px; border:1px solid; font-size:16px; border-bottom-right-radius: 15px;"> ${x.message} </td>
                            </tr>
                        </table>
                    `
                }                 
            }
        )
    }

</script>

<template>
    <div class="w-full flex flex-col justify-center items-center">
        <FormKit
          type="form"
          submit-label="Send"
          :submit-attrs="{
            'suffix-icon': 'submit',
            help: ''
          }"
          #default="{value}"
          @submit="(value)=> sendMsg(value)"
          form-class="$reset min-w-[340px]"
        >          
            <FormKit
                type="text"
                name="name"
                label=""
                placeholder="Name"
                validation="required"
                message-class="$reset text-end text-[var(--color-text)]"
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
                message-class="$reset text-end text-[var(--color-text)]"
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
                help-class="text-[var(--color-text)]"
                label-class="$reset mb-4 font-bold text-sm [&>label:first-child]:text-[var(--color-text)]"
            />
            <br>
            <br>
            <br>
            <br>

            <FormKit
                type="checkbox"
                label="send me a copy of this message"
                name="isCC"
                decorator-icon="check"
                label-class="$reset select-none pl-3 flex items-center [&>span:first-child]:text-[var(--color-text)]"
                :value="true"
                decorator-class="$reset block relative h-5 w-5 mr-2 rounded bg-transparent ring-1 ring-gray-400 peer-checked:ring-blue-500 text-transparent peer-checked:text-blue-500"
            />
            <FormKit
                type="email"
                name="email"
                :disabled="value.isCC ? false : true"
                prefix-icon="email"
                placeholder="email address"
                :validation="value.isCC ? 'required|email' : 'email' "
                message-class="$reset text-end text-[var(--color-text)]"
                prefix-icon-class="$reset w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-400 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto"
            />

            <!-- <pre wrap class="overflow-scroll"> {{ value }}</pre> -->
            
        </FormKit>
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