import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "../../core/store/store.config"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
