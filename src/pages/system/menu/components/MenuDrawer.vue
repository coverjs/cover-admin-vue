<script lang="ts" setup>
import type { CreateMenuDtoWithId } from '@/pages/system/menu/index.vue';
import type { MenuVo } from '@/services';
import { useMessage } from '@/hooks';
import { api } from '@/services';
import { LakySvgIcon } from '@lakyjs/components-vue-layout';
import { AntdIcons } from '../utils';

interface Props {
  type: boolean
  formData: CreateMenuDtoWithId
  treeData: MenuVo[]
}

defineOptions({
  name: 'MenuDrawer',
});
const props = withDefaults(defineProps<Props>(), {
  type: false,
});

const emit = defineEmits<{
  (e: 'refresh'): void
}>();

const open = defineModel('open');

const formRef = ref();
const formState = ref<CreateMenuDtoWithId>(toRaw(props.formData));
const { createNotify } = useMessage();

async function onSubmit() {
  try {
    await formRef.value?.validate();
    const formData = toRaw(formState.value);
    if (formData.parentId === void 0) {
      formData.parentId = null as unknown as number; // 现在先这样 等后端改了再改
    }
    if (props.type) {
      const res = await api.system.menuCreate(formData);
      handleResponse(res, '新增成功');
    }
    else {
      const id = formData.id!;
      const res = await api.system.menuUpdate(id, formData);
      handleResponse(res, '修改成功');
    }
  }
  catch (error: any) {
    console.error(error);
  }
}

function handleResponse(res: any, successMessage: string) {
  if (res.code === 0) {
    createNotify.success({
      message: successMessage,
      duration: 3,
    });
    open.value = false;
    emit('refresh');
  }
}

watch(
  () => props.formData,
  value => {
    formState.value = toRaw(value);
  },
  { immediate: true },
);

// --------------- 图标 picker ----------------
const isDark = useDark();

// 获取 背景颜色 --bg-color 的值
const bgColor = computed(() => {
  return isDark.value ? 'rgb(36, 37, 37)' : '#fff';
});
const page = ref(1);
const icons = computed(() => {
  return AntdIcons.icons.slice((page.value - 1) * 25, page.value * 25);
});

function handleIconSelected(icon: string) {
  formState.value.icon = icon;
}

// -------------- 关闭抽屉 --------------
function onClose() {
  open.value = false;
  formRef.value.resetFields();
  page.value = 1;
}
</script>

<template>
  <a-drawer
    v-model:open="open"
    width="50%"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    :title="type
      ? $t('pages.system.menu.createMenu')
      : $t('pages.system.menu.editMenu')
    "
    placement="right"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-row>
        <a-col :lg="12" :md="24">
          <a-form-item label="菜单类型" name="type" :rules="[{ required: true, message: '请选择菜单类型!' }]">
            <a-radio-group v-model:value="formState.type">
              <a-radio-button value="DIRECTORY">
                目录
              </a-radio-button>
              <a-radio-button value="MENU">
                菜单
              </a-radio-button>
              <a-radio-button value="ACTION">
                按钮
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :lg="12" :md="24">
          <a-form-item label="菜单名称" name="name" :rules="[{ required: true, message: '输入菜单名称!' }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item label="上级菜单" name="parentId">
            <a-tree-select
              v-model:value="formState.parentId"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择上级菜单！"
              allow-clear
              :tree-data="treeData"
              tree-node-filter-prop="label"
              :field-names="{
                children: 'children',
                value: 'id',
                label: 'name',
              }"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item label="排序" name="sort" :rules="[{ required: true, message: '输入排序!' }]">
            <a-input v-model:value.number="formState.sort" />
          </a-form-item>
        </a-col>

        <a-col v-if="formState.type !== 'ACTION'" :lg="12" :md="24">
          <a-form-item label="多语言" name="locale">
            <a-input v-model:value="formState.locale" />
          </a-form-item>
        </a-col>

        <a-col v-if="formState.type !== 'ACTION'" :lg="12" :md="24">
          <a-form-item label="图标" name="icon">
            <a-tooltip
              placement="bottomRight"
              trigger="click"
              :color="bgColor"
            >
              <template #title>
                <!--  7x7 -->
                <div class="w-[250px] grid  grid-cols-5 grid-rows-5 gap-2">
                  <div
                    v-for="item in icons"
                    :key="item"
                    class="flex-center h-[32px] w-[32px] rounded-md cursor-pointer hover:bg-[var(--hover-color)]"
                    @click="handleIconSelected(item)"
                  >
                    <laky-svg-icon :name="item" class="text-[var(--text-color)]" />
                  </div>
                </div>
                <div class="flex-center mt-2">
                  <a-pagination
                    simple
                    :current="page"
                    :default-page-size="25"
                    :total="AntdIcons.icons.length"
                    :show-size-changer="false"
                    size="small"
                    responsive
                    @change="page = $event"
                  />
                </div>
              </template>
              <div class="icon-input">
                <a-input v-model:value="formState.icon" class="cursor-pointer">
                  <template #addonAfter>
                    <div class="i-ant-design:appstore-outlined text-base" />
                  </template>
                </a-input>
              </div>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col v-if="formState.type !== 'ACTION'" :lg="12" :md="24">
          <a-form-item label="路由地址" name="path">
            <a-input v-model:value="formState.path" />
          </a-form-item>
        </a-col>

        <a-col :lg="12" :md="24">
          <a-form-item label="权限标识" name="code" :rules="[{ required: true, message: '输入权限标识!' }]">
            <a-input v-model:value="formState.code" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">
        {{
          $t('common.cancel')
        }}
      </a-button>
      <a-button type="primary" @click="onSubmit">
        {{
          $t('common.confirm')
        }}
      </a-button>
    </template>
  </a-drawer>
</template>

<style scoped lang="scss">
.icon-input{
  :deep(.ant-input){
    cursor: pointer;
  }
}
</style>
