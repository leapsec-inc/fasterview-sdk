<template>
  <div v-if="data" :style="isOpen ? openStyle : wrapperStyle">
    <div :style="inlineStyle">
      <button
        ref="buttonRef"
        :style="buttonStyleComputed"
        @click="toggleOpen"
      >
        {{ data.text }}
      </button>
      <iframe
        :style="iframeStyle"
        :src="`${domain}/user/answer/${id}/embed`"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { wrapperStyle, inlineStyle, buttonStyle, iframeStyle, openStyle } from './style';

export default {
  name: "Embed",
  props: {
    id: {
      type: String,
      required: true
    },
    isDevelopmentMode: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  setup(props) {
    const isOpen = ref(false);
    const buttonLeftCoord = ref(0);
    const buttonRef = ref(null);
    const data = ref(null);
    const domain = props.isDevelopmentMode ? 'http://localhost:3000' : 'https://fasterview.ai';

    const adjustButtonPosition = () => {
      if (buttonRef.value) {
        buttonLeftCoord.value = buttonRef.value.offsetWidth / 2 + buttonRef.value.offsetHeight / 2;
      }
    };

    onMounted(() => {
      setTimeout(adjustButtonPosition, 100);
      window.addEventListener("resize", adjustButtonPosition);
      window.addEventListener("click", handleClick);
      window.addEventListener("message", handleMessage);

      fetch(`${domain}/api/embed?id=${props.id}`)
        .then(res => res.json())
        .then(json => {
          data.value = json;
        })
        .catch(error => {
          console.error('failed to get fasterview embed info. error: ', error);
        });
    });

    onUnmounted(() => {
      window.removeEventListener("resize", adjustButtonPosition);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("message", handleMessage);
    });

    const handleClick = (event) => {
      if (event.target !== buttonRef.value) {
        isOpen.value = false;
      }
    };

    const handleMessage = (event) => {
      if (event.data === `fasterview-close-button-${props.id}`) {
        isOpen.value = false;
      }
    };

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const buttonStyleComputed = computed(() => ({
      ...buttonStyle,
      backgroundColor: data.value?.backgroundColor,
      color: data.value?.textColor,
      left: `-${buttonLeftCoord.value}px`,
    }));

    return {
      isOpen,
      buttonRef,
      data,
      domain,
      wrapperStyle,
      inlineStyle,
      openStyle,
      buttonStyleComputed,
      iframeStyle,
      toggleOpen
    };
  }
};
</script>