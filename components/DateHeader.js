/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {purple} from '../utils/colors';

///NOT USED IN THE APP
export default function DateHeader({date}) {
  return <Text style={{color: purple, fontSize: 25}}>{date}</Text>;
}
