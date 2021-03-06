use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{
        entry::Entry,
    },
    holochain_persistence_api::cas::content::{
        Address,
        AddressableContent
    },
    prelude::*,
};
use holochain_anchors::anchor;
use crate::{entry_name}::{
    {EntryName}Entry,
    {EntryName},
    {ENTRY_NAME}_ENTRY_NAME,
    {ENTRY_NAME}_LINK_TYPE,
    {ENTRY_NAME}_ANCHOR_TYPE,
    {ENTRY_NAME}_ANCHOR_TEXT
};

fn {entry_name}_anchor() -> ZomeApiResult<Address> {
    anchor({ENTRY_NAME}_ANCHOR_TYPE.to_string(), {ENTRY_NAME}_ANCHOR_TEXT.to_string())
}

{CRUD_DEFINITION}