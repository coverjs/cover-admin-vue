<script lang="ts" setup>
import type { CreateRoleDto, MenuVo } from '@/services';
import type { CreateRoleDtoWithId } from './index.vue';
import { useMessage, useRequest } from '@/hooks';
import { MenuMap } from '@/pages/system/menu/utils';
import { api } from '@/services';

interface Props {
  type: boolean
  formData: CreateRoleDtoWithId
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
const formState = ref<CreateRoleDtoWithId>(toRaw(props.formData));
const { createNotify } = useMessage();

function onClose() {
  open.value = false;
  formRef.value.resetFields();
}

async function onSubmit() {
  await formRef.value?.validate();
  try {
    const formData = toRaw(formState.value);
    if (props.type) {
      const res = await api.system.roleCreate(formData as unknown as CreateRoleDto);
      handleResponse(res, '新增成功');
    }
    else {
      const id = formData.id!;
      const res = await api.system.roleUpdate(id, formData);
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

onMounted(() => {
  fetchTreeData();
});

// ------------------- tree -------------------
const tableData = shallowRef<MenuVo[]>([]);
function generateTreeDataWithKey(data: MenuVo[]): MenuVo[] {
  return data.map((item: MenuVo) => {
    return {
      ...item,
      key: item.id,
      children: item.children
        ? generateTreeDataWithKey(item.children)
        : void 0,
    };
  });
}
const treeTableData = computed(() => {
  return generateTreeDataWithKey(tableData.value);
});
const { error, execute, state } = useRequest(api.system.menuFindList, { list: [], total: 0 });
async function fetchTreeData() {
  await execute();
  if (!error.value) {
    tableData.value = state.value.data!.list;
  }
}
</script>

<template>
  <a-drawer
    v-model:open="open"
    width="40%"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    :title="
      type
        ? $t('pages.system.role.createRole')
        : $t('pages.system.role.editRole')
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
      <a-form-item
        label="角色"
        name="name"
        :rules="[{ required: true, message: '输入角色名称!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item
        label="角色描述"
        name="description"
        :rules="[{ required: true, message: '输入角色描述!' }]"
      >
        <a-input v-model:value="formState.description" />
      </a-form-item>

      <a-form-item
        label="菜单分配"
        name="xxx"
      >
        <a-tree
          v-model:checked-keys="formState.menuIds"
          checkable
          :tree-data="treeTableData"
        >
          <template #title="{ name, type: t }">
            {{ name }} -- {{ MenuMap[t] }}
          </template>
        </a-tree>
      </a-form-item>
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
