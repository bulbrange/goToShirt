import { StyleSheet } from 'react-native';
import { RawColors, Colors } from './colors';

const Grid = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
  },
  container: { ...Colors.border, ...Colors.white },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  col1: {
    flex: 0.0833,
    flexDirection: 'column',
    padding: 5,
  },
  col2: {
    flex: 0.1666,
    flexDirection: 'column',
    padding: 5,
  },
  col3: {
    flex: 0.25,
    flexDirection: 'column',
    padding: 5,
  },
  col4: {
    flex: 0.33,
    flexDirection: 'column',
    padding: 5,
  },
  col5: {
    flex: 0.4166,
    flexDirection: 'column',
    padding: 5,
  },
  col6: {
    flex: 0.5,
    flexDirection: 'column',
    padding: 5,
  },
  col7: {
    flex: 0.5833,
    flexDirection: 'column',
    padding: 5,
  },
  col8: {
    flex: 0.6666,
    flexDirection: 'column',
    padding: 5,
  },
  col9: {
    flex: 0.75,
    flexDirection: 'column',
    padding: 5,
  },
  col10: {
    flex: 0.8333,
    flexDirection: 'column',
    padding: 5,
  },
  col11: {
    flex: 0.9166,
    flexDirection: 'column',
    padding: 5,
  },
  col12: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  p0: {
    padding: 0,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignMiddle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Grid;
export { Grid };
